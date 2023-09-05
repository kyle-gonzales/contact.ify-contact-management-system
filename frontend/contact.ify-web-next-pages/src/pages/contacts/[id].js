import { useRouter } from "next/router";
import useContact from "@/hooks/useContact";
import LoadingIndicator from "@/components/LoadingIndicator";
import loadingStatus from "@/utils/loadingStatus";
import EmailItem from "@/components/EmailItem";
import PhoneNumberItem from "@/components/PhoneNumberItem";
import AddressItem from "@/components/AddressItem";

const Contact = () => {
  const router = useRouter();
  const { contact, setContact, loadingState } = useContact(router);

  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  return (
    <div>
      <div>
        <h3>{contact.name}</h3>
      </div>
      <div>
        <h3>Emails</h3>
        <ul>
          {contact.emails.map((email) => (
            <li key={email.contactEmailId}>
              <EmailItem email={email} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Phone Numbers</h3>
        <ul>
          {contact.phoneNumbers.map((phoneNumber) => (
            <li key={phoneNumber.contactPhoneNumberId}>
              <PhoneNumberItem phoneNumber={phoneNumber} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Addresses</h3>
        <ul>
          {contact.addresses.map((address) => (
            <li key={address.contactAddressId}>
              <AddressItem address={address} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Contact;
