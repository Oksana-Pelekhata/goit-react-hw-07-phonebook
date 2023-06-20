import React from 'react';
import { Section, Title, Form, Label, Input, Button } from "./styled"
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelector } from 'redux/selectors';
import { nanoid } from 'nanoid';
import { addContactThunk } from 'redux/contacts/thunks';


export const ContactForm = () => {

  const { items } = useSelector(contactsSelector)
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const name = e.target.elements.name.value
    const phone = e.target.elements.number.value

    const newContact = {
      id: nanoid(),
      name,
      phone
    }
    
        if (items.some((contact)=>(contact.name.toLowerCase() === name.toLowerCase()))) {
      return alert(`Contact with the nane ${name} already exists in your contact-list.`);
    }

    if (items.some((contact)=>(contact.phone === phone))) {
      return alert(`Contact with the number ${phone} already exists in your contact-list.`);
    }
    dispatch(addContactThunk(newContact))
    e.target.reset()
  }

    return (
        <Section>
            <Title>Phonebook</Title>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                <Label htmlFor="name">Name
            <Input
  type="text"
  name="name"
  // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
                        />
                    </Label>
                    
                    <Label htmlFor="number">Phone
            <Input
              type="tel"
              name="number"
              // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
                        />
                </Label>
                    <Button type="submit">Add contact</Button>
                </Form>
        </Section>
    )
}

