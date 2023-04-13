class AssignmentMailer < ApplicationMailer
    def new_assignment_email
        @assignment = params[:assignment]
        @task = @assignment.task
        @user = @assignment.user
        mail(to: 'uncle.brk@gmail.com', subject: 'New Assignment')
    end


end
