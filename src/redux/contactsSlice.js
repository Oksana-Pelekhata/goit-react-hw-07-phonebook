import { createSlice } from '@reduxjs/toolkit';
import { getContacts } from 'api/contacts';

export const getContactsThunk = () => {
    return async (dispatch) => {
        dispatch(contactsSlice.actions.fetchContacts)
        try {
            const data = await getContacts()
            console.log('data', data)
            dispatch(contactsSlice.actions.fetchSuccess(data))
        } catch (error) {
            dispatch(contactsSlice.actions.fetchError(error))
        }
    }
}

const initialState = {
    items: [
    // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    isLoading: false,
    error: null
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        fetchContacts: (state) => state.isLoading = true,
        fetchSuccess: (state, {payload}) => {
            state.isLoading = false
            state.items = payload
            state.error = ''
        },
        fetchError: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        },
         addContact: (state, { payload }) => {
        return [...state, payload]
    },
    deleteContact: (state, { payload }) => {
        return state.filter(contact => contact.id !== payload)
    }
    }
})

export const contactsReducer = contactsSlice.reducer

export const {fetchContacts, fetchSuccess, fetchError, addContact, deleteContact} = contactsSlice.actions