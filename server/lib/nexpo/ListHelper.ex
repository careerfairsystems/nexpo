defmodule Support.List do

  def first_or(list, default) do
    List.first(list) || default
  end

end
