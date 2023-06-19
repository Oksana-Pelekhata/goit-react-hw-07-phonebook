import React from 'react';
import { Section, Title, Form, Label, Input, Button } from "./styled"
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelector } from 'redux/selectors';
import { nanoid } from 'nanoid';
import { addNewContact } from 'redux/contactsSlice';


export const ContactForm = () => {

  const contacts = useSelector(contactsSelector)
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const name = e.target.elements.name.value
    const number = e.target.elements.number.value
    
    const newContact = {
      id: nanoid(),
      name,
      number
    }

        if (contacts.some((contact)=>(contact.name.toLowerCase() === name.toLowerCase()))) {
      return alert(`${name} already exists in your contacts.`);
    }

    if (contacts.some((contact)=>(contact.number === number))) {
      return alert(`Number ${number} already exists in your contacts.`);
    }
    dispatch(addNewContact(newContact))
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
                    
                    <Label htmlFor="number">Number
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

