import { createAsyncThunk } from '@reduxjs/toolkit';
import { addContact, deleteContact, getContacts } from 'api/contacts';


export const getContactsThunk = createAsyncThunk('contacts/getContacts', ({ rejectWithValue }) => {
    try {
        return getContacts()
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const addContactThunk = createAsyncThunk('contacts/addContact', (contact, { rejectWithValue }) => {
    try {
        return addContact()
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteContactThunk = createAsyncThunk('contacts/deleteContact',
    (id, { rejectWithValue }) => {
        try {
            return deleteContact(id)
        } catch (error) {
            return rejectWithValue(error)
        }
    
})