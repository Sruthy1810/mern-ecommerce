import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/date';

const OrderList = (props) => {
  const { orders } = props;

  const renderFirstItem = (order) => {
    if (order.products) {
      const product = order.products[0].product;
      return (
        <img
          className="item-image"
          src={`${
            product && product?.imageUrl
              ? product?.imageUrl
              : '/images/placeholder-image.png'
          }`}
          alt="product" // Ensure alt attribute for accessibility
        />
      );
    } else {
      return <img className="item-image" src="/images/placeholder-image.png" alt="placeholder" />;
    }
  };

  const renderAddress = (order) => {
    const { address } = order.customer;
    if (address) {
      return (
        <div className="customer-address mb-1">
          <span>Address:</span>
          <span className="order-label">{`${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`}</span>
        </div>
      );
    } else {
      return <div className="customer-address">No Address Available</div>;
    }
  };

  return (
    <div className="order-list">
      {orders.map((order, index) => (
        <div key={index} className="order-box">
          <Link to={`/order/${order._id}`} className="d-block box-link">
            <div className="d-flex flex-column flex-lg-row mb-3">
              <div className="order-first-item p-lg-3">
                {renderFirstItem(order)}
              </div>
              <div className="d-flex flex-column flex-xl-row justify-content-between flex-1 ml-lg-2 mr-xl-4 p-3">
                <div className="order-details">
                  <div className="mb-1">
                    <span>Status</span>
                    {order?.products ? (
                      <span className="order-label order-status">{` ${order?.products[0].status}`}</span>
                    ) : (
                      <span className="order-label order-status">Unavailable</span>
                    )}
                  </div>
                  <div className="mb-1">
                    <span>Order #</span>
                    <span className="order-label">{` ${order._id}`}</span>
                  </div>
                  <div className="mb-1">
                    <span>Ordered on</span>
                    <span className="order-label">{` ${formatDate(order.created)}`}</span>
                  </div>
                  <div className="mb-1">
                    <span>Order Total</span>
                    <span className="order-label">{` $${order?.totalWithTax ? order?.totalWithTax : 0}`}</span>
                  </div>
                  {/* Render Customer Address */}
                  {renderAddress(order)}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
