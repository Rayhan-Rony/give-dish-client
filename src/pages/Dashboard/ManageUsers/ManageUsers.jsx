import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import {
  FaTrash,
  FaUserShield,
  FaUtensils,
  FaHandsHelping,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Mutation to update role
  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/${id}`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-users"]);
    },
  });

  // Mutation to delete user
  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-users"]);
    },
  });

  const handleRoleChange = (id, role) => {
    Swal.fire({
      title: `Assign role: ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, make ${role}`,
    }).then((res) => {
      if (res.isConfirmed) {
        updateRoleMutation.mutate({ id, role });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteUserMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200 text-base font-medium">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Assign Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>{idx + 1}</td>
              <td>{user.name || "No Name"}</td>
              <td>{user.email}</td>
              <td>
                <span className="capitalize badge badge-info">
                  {user.role || "user"}
                </span>
              </td>
              <td className="space-x-1">
                <button
                  onClick={() => handleRoleChange(user._id, "admin")}
                  className="btn btn-xs btn-warning"
                >
                  <FaUserShield className="mr-1" /> Admin
                </button>
                <button
                  onClick={() => handleRoleChange(user._id, "restaurant")}
                  className="btn btn-xs btn-success"
                >
                  <FaUtensils className="mr-1" /> Restaurant
                </button>
                <button
                  onClick={() => handleRoleChange(user._id, "charity")}
                  className="btn btn-xs btn-primary"
                >
                  <FaHandsHelping className="mr-1" /> Charity
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-xs btn-error"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
