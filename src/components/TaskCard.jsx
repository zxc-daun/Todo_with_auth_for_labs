import { AiFillDelete, AiOutlineCheckCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";

const TaskCard = ({ data }) => {
  const { handleDone, handleDelete, task, isDoneTask, handleEdit } = data;
  return (
    <div>
      <div
        className={`flex justify-between items-center p-2 bg-blue-800 rounded-md mt-4 + ${
          task.isDone ? "bg-gray-500 opacity-50 line-through" : ""
        }`}
      >
        {task.task}
        <div className="flex gap-2">
          {!isDoneTask && (
            <CiEdit
              data-id={task.id}
              className="h-6 w-6 cursor-pointer"
              onClick={handleEdit}
            />
          )}

          {!isDoneTask && (
            <div>
              {task.isDone ? (
                <BsFillCheckCircleFill
                  data-id={task.id}
                  className="h-6 w-6 cursor-pointer"
                  onClick={handleDone}
                />
              ) : (
                <AiOutlineCheckCircle
                  data-id={task.id}
                  className="h-6 w-6 cursor-pointer"
                  onClick={handleDone}
                />
              )}
            </div>
          )}
          <AiFillDelete
            data-id={task.id}
            className="h-6 w-6 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
