import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import { MyContext } from '../../components/DataProvider/DataProvider';
import EmptyMessage from '../../components/EmptyMessage/EmptyMessage';
import Product from '../../components/Product/Product';
import { db } from '../../utils/firebase';

function Orders() {
  const context = useContext(MyContext);
  const { state } = context;
  const { user } = state;

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setIsLoading(true);
          setError('');
          // Create a reference to the 'orders' collection for the logged-in user and order by 'created' timestamp
          const ordersRef = collection(db, 'users', user.uid, 'orders');
          const q = query(ordersRef, orderBy('created', 'desc'));

          // Fetch all the documents matching the query
          const querySnapshot = await getDocs(q);

          //  console.log(querySnapshot);
          //  Map through the snapshot to create an array of orders
          const ordersList = querySnapshot.docs;

          setOrders(
            ordersList.map(doc => ({ id: doc?.id, data: doc?.data() }))
          );
          setIsLoading(false);
        } catch (err) {
          setIsLoading(true);
          //  console.error('Error fetching orders:', err);
          setError(err);
          setIsLoading(false);
        }
      } else {
        setOrders([]);
      }
    };

    fetchOrders();
  }, [user]);

  //   console.log(orders);

  return (
    <section className="container d-flex justify-content-center">
      {isLoading ? (
        <OrbitProgress
          variant="track-disc"
          speedPlus="-2"
          easing="ease-in-out"
          size="small"
          style={{ fontSize: '10px', marginTop: '100px' }}
          color="#ffcd4f"
          dense
        />
      ) : (
        <div>
          {orders.length > 0 ? (
            <>
              <h2 className="fs-1 fw-bold border-bottom border-3 border-warning pb-4 my-4">
                Your Orders
              </h2>
              {orders?.map(order => {
                return order?.data.basket.map((basket, i) => (
                  <Product
                    data={basket}
                    key={i}
                    className="shadow-none"
                    cart={true}
                    detail={true}
                  />
                ));
              })}
            </>
          ) : (
            <EmptyMessage
              msg={`${
                error ? error?.message : 'Your Amazon Order is empty :)'
              }`}
              redirect="/"
            />
          )}
        </div>
      )}
    </section>
  );
}

export default Orders;
