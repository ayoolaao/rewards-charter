import React, {useEffect, useState} from 'react';
import { getRewardPerTransaction, useFetch } from './utils';

const getSum = (arr, field) => arr.reduce((acc, cur) => acc + getRewardPerTransaction(cur[field]), 0 );
function App() {
  const { response } = useFetch('test');
  const [customersData, updateCustomersData] = useState([]);
  const [selectedCustomer, updateSelectedCustomer] = useState(undefined);

  useEffect(() => {
    updateCustomersData(response);
  }, [ response ]);

  console.log(customersData);

  return (
    <div className="flex h-screen">
      <div className="menu bg-base-200 rounded-box m-4 p-4 prose min-w-max max-w-max grid">
        <h2 className="text-primary mb-0 text-center">Customers</h2>
        <div className="divider divider-accent"></div>
        <div className="overflow-scroll">
          { customersData?.map(customer => (
            <div className={`cursor-pointer hover:bg-primary hover:text-primary-content p-2 rounded-lg ${customer?.id === selectedCustomer?.id ? 'selected' : ''}`}
                key={customer.id}
                onClick={() => updateSelectedCustomer(customer)}
            >
              {customer?.first_name} {customer?.last_name}
            </div>)
          )}
        </div>
      </div>

      <div className="h-full w-3/4 m-4">
          { selectedCustomer ? (
            <>
              <div className="flex my-6 items-center">
                <div className="avatar placeholder">
                  <div className="bg-accent text-neutral-content rounded-full w-24">
                    <span className="text-3xl">{selectedCustomer?.first_name[0]}{selectedCustomer?.last_name[0]}</span>
                  </div>
                </div>
                <div className="prose ml-4">
                  <h3 className="mb-0 text-primary">{selectedCustomer?.first_name} {selectedCustomer?.last_name}</h3>
                  <p className="mt-0 text-secondary">{selectedCustomer?.email}</p>
                </div>
              </div>

              <div>
                <table className="table max-w-screen-lg">
                  <thead>
                  <tr className="text-primary text-lg">
                    <th>Date</th>
                    <th>Amount Spent</th>
                    <th>Points</th>
                  </tr>
                  </thead>
                  <tbody>
                  {selectedCustomer?.transactions?.map(transaction => {
                    return (
                      <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>{transaction.transaction}</td>
                        <td>{getRewardPerTransaction(transaction.transaction)}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td></td>
                      <td className="text-lg text-accent">Total Rewards</td>
                      <td className="text-lg text-accent">{getSum(selectedCustomer?.transactions, 'transaction')}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </>
          ) : <div>Please select a customer</div> }
        </div>
    </div>
  );
}

export default App;
