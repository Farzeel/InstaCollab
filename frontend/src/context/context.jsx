import React, { createContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [postDialog, setPostDialog] = useState(false);
    const [postUploading, setPostUploading] = useState(false);
    return (
        <GlobalContext.Provider value={{ postDialog, setPostDialog }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;
