import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '../../context/NotificationContext';
import { fetchUserProfile, updateProfile } from '../../store/actions/userActions';

const ProfileInfo = () => {
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { showNotification } = useNotification();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        birthDate: '',
        gender: ''
    });

    useEffect(() => {
        if (userInfo && userInfo._id) {
            // ID'yi aldıktan sonra API'den kullanıcı bilgilerini çek
            dispatch(fetchUserProfile(userInfo._id));
        }
    }, [dispatch, userInfo._id]);

    useEffect(() => {
        if (userInfo) {
            // Redux'tan gelen verilerle formu güncelle
            setFormData({
                name: userInfo.name || '',
                email: userInfo.email || '',
                phone: userInfo.phone || '',
                birthDate: userInfo.birthDate ? new Date(userInfo.birthDate).toISOString().split('T')[0] : '',
                gender: userInfo.gender || ''
            });
        }
    }, [userInfo]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateProfile(userInfo._id, formData)); 
            showNotification('Profil bilgileriniz güncellendi', 'success');
        } catch (error) {
            showNotification('Güncelleme sırasında bir hata oluştu', 'error');
        }
    };
    
    
    

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Profil Bilgileri</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">E-posta</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telefon</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Doğum Tarihi</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cinsiyet</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
                        >
                            <option value="">Seçiniz</option>
                            <option value="male">Erkek</option>
                            <option value="female">Kadın</option>
                            <option value="other">Diğer</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-brown-600 text-white px-6 py-2 rounded-md hover:bg-brown-700"
                    >
                        Değişiklikleri Kaydet
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileInfo; 