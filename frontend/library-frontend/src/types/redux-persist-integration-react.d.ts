declare module 'redux-persist/integration/react' {
    import { ReactNode } from 'react';
    import { Persistor } from 'redux-persist';
  
    interface PersistGateProps {
      children?: ReactNode;
      loading?: ReactNode | null;
      persistor: Persistor;
      onBeforeLift?: () => Promise<void> | void;
    }
  
    export class PersistGate extends React.Component<PersistGateProps> {}
  }
  