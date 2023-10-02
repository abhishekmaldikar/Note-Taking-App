import { NotesContext } from "../context/NoteContext";
import { useContext } from "react";

export const useNotesContext = () =>{
    const context = useContext(NotesContext);

    if(!context){
        throw Error("No context provided");
    }

    return context;
}