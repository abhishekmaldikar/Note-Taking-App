import { 
    createContext, 
    useReducer,

} from 'react';

export const NotesContext = createContext();

export const notesReducer = (state, action)=> {
    switch (action.type) {
        case 'SET_NOTES':
            return {
                notes: action.payload
            }
        case 'CREATE_NOTES':
            return {
                notes: [...state.notes,action.payload]
            }
        case 'DELETE_NOTE':
            return {
                notes: state.notes.filter((val) => val._id !== action.payload._id)
            }
        case 'UPDATE_NOTE':
            const updatedNote = action.payload;
            const updatedNotes = state.notes.map((note) =>
             note._id === updatedNote._id ? updatedNote : note
             );
            return {
                notes: updatedNotes,
                };
        default:
            return state
    }
}

export const NotesContextProvider = ({children}) => {
    const [state , dispatch] = useReducer(notesReducer, {
        notes: []
    })
    return (
        <NotesContext.Provider value={{...state,dispatch}}>
            {children}
        </NotesContext.Provider>
    )
}