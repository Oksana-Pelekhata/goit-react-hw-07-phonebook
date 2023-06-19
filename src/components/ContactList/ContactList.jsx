import {Section, ContactItem, ContactButton, ContactName } from './styled'
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelector, filterSelector } from 'redux/selectors';
import { deleteContact, getContactsThunk } from 'redux/contactsSlice';
import { useEffect } from 'react';


export const ContactList = () => {
  const { items, isLoading, error } = useSelector(contactsSelector)
  console.log('items', items)
  const dispatch = useDispatch();

  const { filter } = useSelector(filterSelector)
  
  useEffect(()=> {dispatch(getContactsThunk())},[dispatch])

    const filterContacts = () => {
    return items.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    };
  
  const getFilteredContacts = filterContacts()

  const handleDelete = (id) => {
    dispatch(deleteContact(id))
  }
  return (
    <Section>
      {error && <h2>{error}</h2>}
      {isLoading && <p>Is loading...</p>}
        {items.length === 0 ? (
          <p>You don't have contacts yet</p>
        ) :
          (<ul> {
            getFilteredContacts.map(({ id, name, phone }) => {
              return (
                <ContactItem key={id}>
                  <ContactName>
                    {name}: {phone}
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

