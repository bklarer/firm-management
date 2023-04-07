import { useDispatch, useSelector } from "react-redux";
import {
  selectTaskById,
  taskRemoved,
  taskUpdated,
} from "../../slices/taskSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import { selectAssignmensByTaskId } from "../../slices/assignmentSlice";
import {
  assignmentAdded,
  assignmentRemoved,
} from "../../slices/assignmentSlice";

const EditTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const projects = useSelector((state) => state.projects.projects);
  const [projectCheckbox, setProjectCheckbox] = useState(false);
  const users = useSelector((state) => state.users.users);
  const [projectId, setProjectId] = useState("");
  const task = useSelector((state) => selectTaskById(state, parseInt(taskId)));
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const userAssignments = useSelector((state) =>
    selectAssignmensByTaskId(state, parseInt(taskId))
  );
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    notes: "",
    due_date: "",
    due_time: "",
  });

  const [usersDropdown, setUsersDropdown] = useState([]);

  const formattedTask = {
    title: updatedTask.title,
    notes: updatedTask.notes,
    due_date: updatedTask.due_date + "T" + updatedTask.due_time + ":00",
  };
  console.log("userAssignments", userAssignments);

  useLayoutEffect(() => {
    if (!initialized) {
      if (task) {
        const updatedTask = {
          title: task.title,
          notes: task.notes,
          due_date: task.due_date.slice(0, 10),
          due_time: task.due_date.slice(11, 16),
        };
        if (task.project_id) {
          setProjectId(task.project_id);
          setProjectCheckbox(true);
        }
        setUpdatedTask(updatedTask);
        if (userAssignments) {
          const initialUsers = [...userAssignments].map((assignment) => {
            return users.find((user) => user.id === assignment.user_id);
          });
          setAssignedUsers(initialUsers);
        }
      }
        setInitialized(true);
      }
      
    }, [initialized, task, users, userAssignments, assignedUsers]);


    
    useEffect(() => {
        const unassignedUsers =  users && assignedUsers? users.filter((user) => {
      return !assignedUsers.find((assignedUser) => assignedUser.id === user.id);
    }) : []
      setUsersDropdown(unassignedUsers)
    
    }, [assignedUsers, users])


  const handleFormChange = (e) => {
    setUpdatedTask((updatedTask) => ({
      ...updatedTask,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask =
      projectCheckbox && projectId
        ? { ...formattedTask, project_id: projectId }
        : { ...formattedTask, project_id: null };

    fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((resp) => resp.json())
      .then((changedTask) => {
        dispatch(taskUpdated(changedTask));
      });
  };

  const handleDeleteClick = () => {
    fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate("/");
      dispatch(taskRemoved(parseInt(taskId)));
    });
  };

  const handleAssignedUsers = (e) => {
    const user = users.find((user) => user.id === parseInt(e.target.value));
    const assignment = userAssignments.find(
      (assignment) => assignment.user_id === user.id
    );
    if (assignedUsers.find((assignedUser) => assignedUser.id === user.id)) {
      fetch(`/api/assignments/${assignment.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        setAssignedUsers(
          assignedUsers.filter((assignedUser) => assignedUser.id !== user.id)
        );
        // usersDropdown.push(user)
        setUsersDropdown([...usersDropdown, user]);
        dispatch(assignmentRemoved(assignment));
      });
    } else {
      fetch(`/api/assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ user_id: user.id, task_id: taskId }),
      })
        .then((resp) => resp.json())
        .then((assignment) => {
          setAssignedUsers([...assignedUsers, user]);
          // usersDropdown.filter((updatedUser) => updatedUser.id !== user.id )
          setUsersDropdown(
            usersDropdown.filter((updatedUser) => updatedUser.id !== user.id)
          );
          dispatch(assignmentAdded(assignment));
        });
    }
  };

  console.log("assignedUsers", assignedUsers);
  console.log("usersDropdown", usersDropdown);

  const handleUnassign = (userId) => {
    const assignment = userAssignments.find(
      (assignment) => assignment.user_id === userId
    );

    fetch(`/api/assignments/${assignment.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setAssignedUsers((assignedUsers) =>
        assignedUsers.filter((user) => user.id !== userId)
      );
      // usersDropdown.push(users.find((user) => user.id === userId))
      setUsersDropdown([
        ...usersDropdown,
        users.find((user) => user.id === userId),
      ]);
      dispatch(assignmentRemoved(assignment));
    });
  };

  let date = new Date().toISOString().slice(0, 10);

  return (
    <>
      <h1>Edit Task</h1>
      <form className="edit-task" onSubmit={handleSubmit}>
        <input
          name="title"
          onChange={handleFormChange}
          value={updatedTask.title}
          type="text"
          placeholder="Title"
        />
        <textarea
          name="notes"
          onChange={handleFormChange}
          value={updatedTask.notes}
          placeholder="Notes"
        />
        <div>
          <label>
            Due Date:{" "}
            <input
              name="due_date"
              onChange={handleFormChange}
              value={updatedTask.due_date}
              type="date"
              min={date}
            />
          </label>
          <label>
            Due Time:{" "}
            <input
              name="due_time"
              onChange={handleFormChange}
              value={updatedTask.due_time}
              type="time"
            />
          </label>
        </div>
        <div>
          <label>
            Project?
            <input
              name="project_checkbox"
              onChange={(e) => setProjectCheckbox(e.target.checked)}
              checked={projectCheckbox}
              type="checkbox"
            />
          </label>
          <select
            name="project_id"
            disabled={projectCheckbox ? false : true}
            onChange={(e) => setProjectId(e.target.value)}
            value={projectId}
          >
            <option default disabled value="">
              Pick One
            </option>
            {projects.map((project) => {
              return (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <select onChange={handleAssignedUsers} value="">
            <option default disabled value="">
              Pick users
            </option>
            {usersDropdown.map((user) => {
              return (
                <option
                  key={user.id}
                  value={user.id}
                >{`${user.first_name} ${user.last_name}`}</option>
              );
            })}
          </select>
        </div>
        {assignedUsers.map((user) => (
          <div key={user.id}>
            <span>{`${user.first_name} ${user.last_name}`}</span>
            <button onClick={() => handleUnassign(user.id)}>x</button>
          </div>
        ))}
        <input type="submit" />
      </form>

      <button onClick={handleDeleteClick}>Delete</button>
    </>
  );
};

export default EditTask;
