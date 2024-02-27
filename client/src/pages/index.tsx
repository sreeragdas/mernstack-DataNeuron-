import { observer } from 'mobx-react-lite';
import React from 'react';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '../components';
import { RequireAuth } from '../utils';

import { Login } from './Login';


export const Pages: React.FC = observer(() => {
    return (
        <div className='pages'>
            <BrowserRouter>
                <Routes>
              
                    <Route path='/' element={<Login />} />
                 
               
                </Routes>
            </BrowserRouter>
        </div>
    );
});
