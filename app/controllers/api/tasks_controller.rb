class Api::TasksController < ApplicationController


    def index
        render json: Task.all
    end

    def create
        task = Task.create!(task_params)
        render json: task, status: :created
    end

    def show
        task = find_task
        render json: task
    end

    def update
        task = find_task
        task.update!(task_params)
        render json: task
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
            :creator_id,
            :project_id,
        )
    end

    def find_task
        Task.find(params[:id])
    end


end
