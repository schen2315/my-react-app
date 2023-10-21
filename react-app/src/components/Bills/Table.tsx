import styles from "./Form.module.css";
import { useState } from "react";

type Item = {
  description: String;
  amount: number;
  catergory: "GROCERIES" | "UTILITIES" | "ENTERTAINMENT";
};
interface TableProps {
  items: Item[];
  onDeleteItem: (index: number) => void;
}

const Table = ({ items, onDeleteItem }: TableProps) => {
  const [filterCatergory, setFilterCatergory] = useState("ALL");

  const sumAmount = (catergory: string) => {
    let retVal = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].catergory === catergory || catergory === "ALL") {
        retVal += items[i].amount;
      }
    }
    return retVal;
  };
  if (items.length === 0) return null;
  return (
    <div className={styles.itemizedForm}>
      <select
        id="catergory"
        className="form-select"
        onChange={(event) => {
          setFilterCatergory(event.target.value);
        }}
      >
        <option value="ALL">All Catergories</option>
        <option value="GROCERIES">Groceries</option>
        <option value="UTILITIES">Utilities</option>
        <option value="ENTERTAINMENT">Entertainment</option>
      </select>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Catergory</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {items.map(
            (item, index) =>
              (item.catergory === filterCatergory ||
                filterCatergory === "ALL") && (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>${item.amount.toFixed(2)}</td>
                  <td>{item.catergory}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDeleteItem(index)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              )
          )}
          <tr>
            <td>TOTAL</td>
            <td>${sumAmount(filterCatergory).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
export type { Item };
