import { createSlice } from '@reduxjs/toolkit';
import {initialState } from './initialState'
import { addContactThunk, deleteContactThunk, getContactsThunk } from './thunks';

const handlePending = (state) => state.isLoading = true

const handleFulfilled = (state, {payload}) => {
            state.isLoading = false
            state.items = payload
            state.error = ''
}
            
const handleRejected = (state, { payload }) => {
            state.isLoading = false
            state.error = payload
}
        
const handleAddContactFulfilled = (state, { payload }) => {
    state.isLoading = false;
    state.items = [payload, ...state.items];
    state.error = '';
}

const handleDeleteContactFulfilled = (state, { payload }) => {
    state.isLoading = false;
    state.items = state.items.filter(el => el.id !== payload.id);;
    state.error = '';
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,

    extraReducers: (builder) => {
        builder
        // .addCase(getContactsThunk.pending, handlePending)
        .addCase(getContactsThunk.fulfilled, handleFulfilled)
        // .addCase(getContactsThunk.rejected, handleRejected)
        .addCase(addContactThunk.fulfilled, handleAddContactFulfilled)
        .addCase(deleteContactThunk.fulfilled, handleDeleteContactFulfilled)
        .addMatcher(action => { action.type.endsWith('/pending') }, handlePending)
        .addMatcher(action => {action.type.endsWith('/rejected')}, handleRejected)

    }
})

export const contactsReducer = contactsSlice.reducer

// export const { addContact, deleteContact } = contactsSlice.actions


// export const getContactsThunk = () => {
//     return async (dispatch) => {
//         dispatch(contactsSlice.actions.fetchContacts)
//         try {
//             const data = await getContacts()
//             console.log('data', data)
//             dispatch(contactsSlice.actions.fetchSuccess(data))
//         } catch (error) {
//             dispatch(contactsSlice.actions.fetchError(error))
//         }
//     }
// }

    // reducers: {
    //     fetchContacts: (state) => state.isLoading = true,
    //     fetchSuccess: (state, {payload}) => {
    //         state.isLoading = false
    //         state.items = payload
    //         state.error = ''
    //     },
    //     fetchError: (state, { payload }) => {
    //         state.isLoading = false
    //         state.error = payload
    //     },
    //      addContact: (state, { payload }) => {
    //     return [...state, payload]
    // },
    // deleteContact: (state, { payload }) => {
    //     return state.filter(contact => contact.id !== payload)
    // }
    // }

    //extraRedusers:
        //  {
    //     [getContactsThunk.pending]: (state) => state.isLoading = true,
    //     [getContactsThunk.fulfilled]:(state, {payload}) => {
    //         state.isLoading = false
    //         state.items = payload
    //         state.error = ''
    //     },
    //     [getContactsThunk.rejected]: (state, { payload }) => {
    //         state.isLoading = false
    //         state.error = payload
    //     },
    // }