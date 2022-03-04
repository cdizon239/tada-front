import React, { useEffect } from "react";
import Header from "./Header";

export const TodosLanding = () => {
  const getTodos = async () => {
    let allTodos = await fetch(process.env.REACT_APP_BACKEND_URL + "/todo");
		let jsonAllTodos = await allTodos.json()
		return jsonAllTodos
  };

	

	useEffect(() => {
		getTodos()
	}, [])

  return <Header title={"Todos"} />;
};
