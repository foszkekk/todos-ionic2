##TODOS
- observables instead of promises in services
- event handling for removing lists and stuff for reactivity
- state managament (ie. when pressing on list state = 'select'
and clicking on list adds it to 'selected' array, then user can
remove all selected lists)


## v0.0.4
- moved toast functionality to helpers service
- removed re-rendering when trying to navigate to current page
- added settings page
- added clearing data
- added restoring settings to default
- added possibility to disable toasts (WIP)
- added settings service
- limited list title and todo item length to 96 and 128 chars
- removed trimming text in lists (list title and todo item text)
- toasts no more appear when backing out of edit form or colorpicker
- disabled side menu in intro page
- changed toast messages (longer list titles bugged toasts)
- finished settings (user can now disable toasts, restore settings to default
  and clear all data)

## v0.0.3
- updated ionic to 2.0.0-rc.5
- added intro slides
- added firstLaunch to storage for intro slides
- added animation when navigating to a different page
- added toasts with info when creating/updating/removing lists

## v0.0.2

- added localStorage database
- added side menu functionality
- added viewList page
- added lists service (get all, add, update, remove)
- added creating, editing and removing lists functionality
- added creating new list items functionality
- added TrashPage (WIP)

## v0.0.1

- added lists page (list of TodoLists)
- added list page (single TodoList page)
- added list form (for editing and creating new Lists)
- added colorpicker page
- added colors.json for colorpicker page
- added models for lists and list items
- added mock listItems and todolists
- added helper methods (service) for generating ID and for getting colors from colors.json

* removed home page
