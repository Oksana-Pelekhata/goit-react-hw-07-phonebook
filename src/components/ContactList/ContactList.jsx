import {Section, ContactItem, ContactButton, ContactName } from './styled'
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelector, filterSelector } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';


export const ContactList = () => {
const contacts = useSelector(contactsSelector)
  const dispatch = useDispatch();

  const {filter} = useSelector(filterSelector)

    const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    };
  
  const getFilteredContacts = filterContacts()

  const handleDelete = (id) => {
    dispatch(deleteContact(id))
  }
    return (
        <Section>
        {contacts.length === 0 ? (
          <p>You don't have contacts yet</p>
        ) :
          (<ul> {
            getFilteredContacts.map(({ id, name, number }) => {
              return (
                <ContactItem key={id}>
                  <ContactName>
                    {name}: {number}
                  </ContactName>
                  <ContactButton type="button" onClick={() => handleDelete(id)}>
                    Delete
                  </ContactButton>
                </ContactItem>
              );
            })
          }
          </ul>)}
        </Section>
       )
    
}

