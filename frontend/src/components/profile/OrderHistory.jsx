import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserOrders } from '../../store/actions/userActions';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(state => state.user);

    useEffect(() => {
        const userEmail = "emircanmertt@gmail.com"; // Burada kullanıcı e-postasını alabilirsiniz
        if (userEmail) {
            console.log("Kullanıcı e-postası bulundu: ", userEmail);
            dispatch(getUserOrders(userEmail)); // Siparişleri getir
        } else {
            console.log("Kullanıcı e-postası bulunamadı.");
        }
    }, [dispatch]);

    useEffect(() => {
        console.log("Siparişler:", orders); // Burada gelen veriyi kontrol edelim
    }, [orders]);

    if (loading) {
        return <div className="text-center py-8">Yükleniyor...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Sipariş Geçmişim</h2>
            {orders?.length > 0 ? (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order._id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="font-medium">Sipariş No: #{order._id}</p>
                                    <p className="text-sm text-gray-600">
                                        Tarih: {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                    order.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {order.status === 'delivered' ? 'Teslim Edildi' :
                                     order.status === 'pending' ? 'Beklemede' :
                                     'Kargoda'}
                                </span>
                            </div>

                            {/* Sipariş öğelerini göster */}
                            <div className="space-y-2">
                                {order.products?.map(item => (
                                    <div key={item._id} className="flex items-center gap-4">
                                        <div>
                                            <p className="font-medium">{item.name || "Ürün Adı"}</p>
                                            <p className="text-sm text-gray-600">
                                                {item.quantity} adet x {item.price} TL
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Sipariş toplamı */}
                            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Toplam: {order.totalAmount} TL</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <i className="fas fa-shopping-bag text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500">Henüz siparişiniz bulunmuyor.</p>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
