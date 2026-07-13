import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'issue', message: 'High severity hazard: Wastewater levels exceeded in sector B', read: false },
        { id: 2, type: 'badge', message: 'Trophy unlocked: Carbon Hero (Earned 500 XP)', read: false },
        { id: 3, type: 'audit', message: 'Scheduled Q2 Environmental Audit for next Friday', read: false },
        { id: 4, type: 'policy', message: 'Acknowledge required: Read & sign Code of Conduct policy v1.5', read: false },
        { id: 5, type: 'challenge', message: 'New CSR event listing: Tree plantation drive near park area', read: true }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const addNotification = (type, message) => {
        setNotifications(prev => [
            {
                id: Date.now(),
                type,
                message,
                read: false
            },
            ...prev
        ]);
    };

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
