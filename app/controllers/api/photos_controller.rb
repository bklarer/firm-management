class Api::PhotosController < ApplicationController



    def create
        result = Cloudinary::Uploader.upload(params[:image])
        photo = Photo.create(user_id: params[:id], image: result['url'])
        if photo.save
            render json: photo
         else
            render json: photo.errors
         end
    end

end

# Will need to update params to current user at some point