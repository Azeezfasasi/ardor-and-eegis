import ContactUsMain from "@/components/home-component/ContactUsMain";
import PageTitle from "@/components/home-component/PageTitle";

export const metadata = {
  title: 'Contact Us - Ardor Aegis',
  description: 'Get in touch with Ardor Aegis. Have questions about our security services? Contact us today and let\'s discuss how we can help protect your community.',
  openGraph: {
    title: 'Contact Us - Ardor Aegis',
    description: 'Reach out to our team to learn more about our security solutions.',
    url: 'https://ardor-aegis.com/contact-us',
    type: 'website',
  },
};

export default function ContactUs() {
  return (
    <>
    <PageTitle title="Contact Us" subtitle="Have questions or want to work with us? Reach out using the form below or through our contact details." />
    <ContactUsMain />
    </>
  )
}
