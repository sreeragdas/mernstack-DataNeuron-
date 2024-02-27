import './App.scss';
import './Theme.scss';
import 'react-notifications/lib/notifications.css';

import React, { useEffect, useState } from 'react';
import { NotificationContainer } from 'react-notifications';

import { Loader } from './components';
import { Pages } from './pages';
import { useStore } from './stores';

export const App: React.FC = () => {
    const [authLoaded, setAuthLoaded] = useState(false);
    const { authStore } = useStore();

    // useEffect(() => {
    //     authStore.getUser().finally(() => setAuthLoaded(true));
    // }, []);
    // if (!authLoaded) {
    //     return <Loader />;
    // }
    return (
        <div>
            <Pages />
            <NotificationContainer />
        </div>
    );
};
