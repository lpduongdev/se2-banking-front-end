import React from 'react';


const SharedContext = React.createContext()


export const SharedProvider = SharedContext.Provider;

export const SharedConsumer = SharedContext.Consumer;

export default SharedContext;