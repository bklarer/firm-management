class Api::ProjectsController < ApplicationController

    def index
        render json: Project.all
    end

    def create
        project = Project.create!(project_params.merge(creator_id: @current_user[:id]))
        render json: project, status: :created
    end

    def show
        project = find_project
        render json: project
    end

    def update
        project = find_project
        project.update!(project_params)
        render json: project
    end

    def destroy
        project = find_project
        project.destroy
        head :no_content
    end


    private

    def project_params
        params.permit(
            :title,
            :due_date,
            :notes,
            :completed,
            :id
        )
    end

    def find_project
        Project.find(params[:id])
    end

end
