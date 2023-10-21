import React, { FormEvent, useRef } from "react";
import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Form.module.css";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Please Give a Description with at least 3 chars." }),
  amount: z.number().min(1, { message: "Amount must be at least 1." }),
  catergory: z.enum(["GROCERIES", "UTILITIES", "ENTERTAINMENT"]),
});

type FormData = z.infer<typeof schema>;

interface FormProps {
  onSubmit: (data: FieldValues) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // const onSubmit = (data: FieldValues) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.itemizedForm}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="catergory" className="form-label">
          Catergory
        </label>
        <select
          {...register("catergory")}
          id="catergory"
          className="form-select"
        >
          <option value="GROCERIES">Groceries</option>
          <option value="UTILITIES">Utilities</option>
          <option value="ENTERTAINMENT">Entertainment</option>
        </select>
        {errors.catergory && (
          <p className="text-danger">{errors.catergory.message}</p>
        )}
      </div>
      <button
        disabled={!isValid}
        className="btn btn-primary"
        type="submit"
        onClick={() => console.log(isValid, errors)}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
