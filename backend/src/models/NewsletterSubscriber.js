import mongoose from 'mongoose'

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true, collection: 'newsletter_subscribers' }
)

const NewsletterSubscriber = mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema)

export default NewsletterSubscriber
