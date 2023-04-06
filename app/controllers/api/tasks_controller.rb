class Api::TasksController < ApplicationController


    def index
        render json: Task.all, status: :ok
    end

    def create
        task = Task.create!(task_params.merge(creator_id: @current_user[:id]))
        task.user_ids = params[:user_ids]
        render json: task, status: :created
      end

    def show
        task = find_task
        render json: task, status: :ok
    end

    def update
        task = find_task
        task.update!(task_params)
        render json: task, status: :accepted
    end

    def destroy
        task = find_task
        task.destroy
        head :no_content
    end


    private

    def task_params
        params.permit(
            :title,
            :notes,
            :due_date,
            :project_id,
            :completed,
        )
    end

    def find_task
        Task.find(params[:id])
    end


end
