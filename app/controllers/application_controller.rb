class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  def after_sign_in_path_for(resource)
    return admin_root_path if resource.admin?

    stored_location_for(resource) || root_path
  end
end
