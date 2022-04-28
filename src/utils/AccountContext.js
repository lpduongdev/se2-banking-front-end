import React from "react";

const AccountSharedContext = React.createContext()

export const AccountContextProvider = AccountSharedContext.Provider;

export const AccountContextConsumer = AccountSharedContext.Consumer;

export default AccountSharedContext;