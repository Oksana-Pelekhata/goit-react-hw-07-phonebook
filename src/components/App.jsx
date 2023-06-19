
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList/';
import { FilterForm } from './FilterForm';


export const App = () => {

    return (
      <ThemeProvider theme={theme}>
        <ContactForm  />
        <FilterForm
          label="Find contacts by name"
        />
          <ContactList />
      </ThemeProvider>
    );
  }