import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNotification } from '../context/NotificationContext';
import ProfileInfo from '../components/profile/ProfileInfo';
import AddressList from '../components/profile/AddressList';
import OrderHistory from '../components/profile/OrderHistory';
import Favorites from '../components/profile/Favorites.jsx';
import NotificationSettings from '../components/profile/NotificationSettings';
import ChangePassword from '../components/profile/ChangePassword';
import { useSearchParams } from 'react-router-dom';

const Profile = () => {
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
    const { userInfo } = useSelector(state => state.user);
    const { showNotification } = useNotification();

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const tabs = [
        { id: 'profile', label: 'Profil Bilgileri', icon: 'user' },
        { id: 'orders', label: 'Siparişlerim', icon: 'shopping-bag' },
        { id: 'addresses', label: 'Adreslerim', icon: 'map-marker-alt' },
        { id: 'password', label: 'Şifre Değiştir', icon: 'lock' },
        { id: 'notifications', label: 'Bildirim Ayarları', icon: 'bell' },
        { id: 'favorites', label: 'Favorilerim', icon: 'heart' }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex gap-8">
                {/* Sol Menü */}
                <div className="w-64 shrink-0">
                    <div className="bg-white rounded-lg shadow p-6 space-y-4">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-3">
                                <i className="fas fa-user text-2xl text-gray-600"></i>
                            </div>
                            <h3 className="font-medium">{userInfo.name}</h3>
                            <p className="text-sm text-gray-500">{userInfo.email}</p>
                        </div>

                        <nav className="space-y-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                                        activeTab === tab.id
                                            ? 'bg-brown-100 text-brown-800'
                                            : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <i className={`fas fa-${tab.icon} w-5`}></i>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Sağ İçerik */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg shadow p-6">
                        {activeTab === 'profile' && <ProfileInfo />}
                        {activeTab === 'orders' && <OrderHistory />}
                        {activeTab === 'addresses' && <AddressList />}
                        {activeTab === 'password' && <ChangePassword />}
                        {activeTab === 'notifications' && <NotificationSettings />}
                        {activeTab === 'favorites' && <Favorites />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 