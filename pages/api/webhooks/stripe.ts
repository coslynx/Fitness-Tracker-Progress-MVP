import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const signature = req.headers['stripe-signature'];

  if (!signature) {
    return res.status(400).json({ message: 'Missing Stripe signature' });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ message: 'Webhook signature verification failed' });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      // Handle checkout session completed event
      const session = event.data.object as Stripe.Checkout.Session;
      // Update user's subscription or profile based on the session data
      break;
    case 'customer.subscription.created':
      // Handle customer subscription created event
      const subscription = event.data.object as Stripe.Subscription;
      // Update user's subscription status and profile
      break;
    case 'customer.subscription.updated':
      // Handle customer subscription updated event
      const subscription = event.data.object as Stripe.Subscription;
      // Update user's subscription status and profile
      break;
    case 'customer.subscription.deleted':
      // Handle customer subscription deleted event
      const subscription = event.data.object as Stripe.Subscription;
      // Update user's subscription status and profile
      break;
    // ... other webhooks to handle
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).end();
}