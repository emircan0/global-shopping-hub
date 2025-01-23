import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '../../context/NotificationContext';
import { fetchAddresses, addAddress, updateAddress, deleteAddress } from '../../store/actions/userActions';

const AddressList = () => {
    const { userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { showNotification } = useNotification();
    
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        fullName: '',
        phone: '',
        city: '',
        district: '',
        zipCode: '',
        fullAddress: '',
        isDefault: false,
    });
    const [hasFetchError, setHasFetchError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Adres verileri yükleniyor...');
                const result = await dispatch(fetchAddresses());
                console.log('Adresler verisi:', result);
                setHasFetchError(false);
            } catch (error) {
                console.error('Adresler yüklenirken bir hata oluştu:', error);
                if (!hasFetchError) {
                    showNotification('Adresler yüklenirken bir hata oluştu', 'error');
                    setHasFetchError(true);
                }
            }
        };
        fetchData();
    }, [dispatch, showNotification, hasFetchError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAddress) {
                console.log('Adres güncelleniyor...', formData);
                await dispatch(updateAddress(editingAddress._id, formData));
                showNotification('Adres güncellendi', 'success');
            } else {
                console.log('Yeni adres ekleniyor...', formData);
                await dispatch(addAddress(formData));
                showNotification('Yeni adres eklendi', 'success');
            }

            setShowAddForm(false);
            setEditingAddress(null);
            setFormData({
                title: '',
                fullName: '',
                phone: '',
                city: '',
                district: '',
                zipCode: '',
                fullAddress: '',
                isDefault: false,
            });

            console.log('Adresler yeniden yükleniyor...');
            await dispatch(fetchAddresses());
        } catch (error) {
            console.error('Form gönderiminde bir hata oluştu:', error);
            showNotification('Bir hata oluştu', 'error');
        }
    };

    const handleDelete = async (addressId) => {
        if (window.confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
            try {
                console.log('Adres siliniyor, ID:', addressId);
                await dispatch(deleteAddress(addressId));
                showNotification('Adres silindi', 'success');
                console.log('Adres silindi, adresler yeniden yükleniyor...');
                await dispatch(fetchAddresses());
            } catch (error) {
                console.error('Silme işlemi başarısız oldu:', error);
                showNotification('Silme işlemi başarısız oldu', 'error');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Adreslerim</h2>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700"
                >
                    Yeni Adres Ekle
                </button>
            </div>

            {/* Adres Listesi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userInfo?.addresses?.length > 0 ? (
                    userInfo.addresses.map((address) => (
                        <div key={address._id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-medium">{address.title}</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingAddress(address);
                                            setFormData(address);
                                            setShowAddForm(true);
                                        }}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(address._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{address.fullName}</p>
                            <p className="text-sm text-gray-600">{address.phone}</p>
                            <p className="text-sm text-gray-600">
                                {address.fullAddress}, {address.district}/{address.city}
                            </p>
                            {address.isDefault && (
                                <span className="inline-block mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                    Varsayılan Adres
                                </span>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Henüz adres eklenmedi.</p>
                )}
            </div>

            {/* Adres Formu Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">
                            {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Başlık"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Adı Soyadı"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Telefon"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Şehir"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                            <input
                                type="text"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                placeholder="İlçe"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                            <input
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                placeholder="Posta Kodu"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                            <input
                                type="text"
                                name="fullAddress"
                                value={formData.fullAddress}
                                onChange={handleChange}
                                placeholder="Adres"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isDefault"
                                    checked={formData.isDefault}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Varsayılan Adres
                            </label>
                            <button
                                type="submit"
                                className="w-full bg-brown-600 text-white py-2 rounded-md hover:bg-brown-700"
                            >
                                {editingAddress ? 'Güncelle' : 'Ekle'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressList;
