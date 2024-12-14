import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoHeader = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [currentTitleId, setCurrentTitleId] = useState(null);
  const [currentSubtitleId, setCurrentSubtitleId] = useState(null);
  const [allTitles, setAllTitles] = useState([]);
  const [allSubtitles, setAllSubtitles] = useState([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);
  const [showSubtitleInput, setShowSubtitleInput] = useState(null);

  // Fetch all titles
  const fetchTitles = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PORT}api/titles`);
      if (response.ok) {
        const data = await response.json();
        setAllTitles(data);
      } else {
        console.error('Failed to fetch titles');
      }
    } catch (error) {
      console.error('Error fetching titles:', error);
    }
  };

  // Fetch all subtitles
  const fetchSubtitles = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PORT}api/subtitles`);
      if (response.ok) {
        const data = await response.json();
        setAllSubtitles(data);
      } else {
        console.error('Failed to fetch subtitles');
      }
    } catch (error) {
      console.error('Error fetching subtitles:', error);
    }
  };

  useEffect(() => {
    fetchTitles();
    fetchSubtitles();
  }, []);

  // Save a new title
  const handleSaveTitle = async () => {
    if (isEditingTitle && currentTitleId) {
      // Handle title update
      try {
        const response = await fetch(`${process.env.REACT_APP_PORT}api/updatetitle/${currentTitleId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });
        if (response.ok) {
          fetchTitles(); // Refresh titles list
          setTitle(''); // Clear the title input
          setIsEditingTitle(false); // Reset editing mode
          setCurrentTitleId(null); // Clear currentTitleId
        } else {
          console.error('Failed to update title');
        }
      } catch (error) {
        console.error('Error updating title:', error);
      }
    } else {
      // Handle new title creation
      try {
        const response = await fetch(`${process.env.REACT_APP_PORT}/api/createtitle`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });
        if (response.ok) {
          fetchTitles(); // Refresh titles list
          setTitle(''); // Clear the title input
        } else {
          console.error('Failed to save title');
        }
      } catch (error) {
        console.error('Error saving title:', error);
      }
    }
  };

  // Save a new subtitle
  const handleSaveSubtitle = async (titleId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PORT}api/createsubtitle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subtitle, titleId }),
      });
      if (response.ok) {
        fetchSubtitles(); // Refresh subtitles list
        setSubtitle('');
        setShowSubtitleInput(null); // Hide input after saving
      } else {
        console.error('Failed to save subtitle');
      }
    } catch (error) {
      console.error('Error saving subtitle:', error);
    }
  };

  // Delete a title
  const handleDeleteTitle = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PORT}api/deletetitle/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTitles();
      } else {
        console.error('Failed to delete title');
      }
    } catch (error) {
      console.error('Error deleting title:', error);
    }
  };

  // Edit a subtitle
  const handleEditSubtitle = async () => {
    if (currentSubtitleId && subtitle) {
      try {
        const response = await fetch(`${process.env.REACT_APP_PORT}api/updatesubtitle/${currentSubtitleId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subtitle }),
        });
        if (response.ok) {
          fetchSubtitles();
          setSubtitle('');
          setCurrentSubtitleId(null);
          setIsEditingSubtitle(false);
        } else {
          console.error('Failed to update subtitle');
        }
      } catch (error) {
        console.error('Error updating subtitle:', error);
      }
    }
  };

  // Delete a subtitle
  const handleDeleteSubtitle = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PORT}api/deletesubtitle/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchSubtitles();
      } else {
        console.error('Failed to delete subtitle');
      }
    } catch (error) {
      console.error('Error deleting subtitle:', error);
    }
  };

  // Handle drag end for titles
  const handleTitleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTitles = Array.from(allTitles);
    const [movedItem] = reorderedTitles.splice(result.source.index, 1);
    reorderedTitles.splice(result.destination.index, 0, movedItem);
    setAllTitles(reorderedTitles);
    // updateTitlesOrder(reorderedTitles);
  };

  // Handle drag end for subtitles
  const handleSubtitleDragEnd = (result) => {
    if (!result.destination) return;

    const titleId = result.source.droppableId.split('-')[1];  // Extract titleId
    const filteredSubtitles = allSubtitles.filter(sub => sub.titleId === titleId);
    const reorderedSubtitles = Array.from(filteredSubtitles);
    const [movedItem] = reorderedSubtitles.splice(result.source.index, 1);
    reorderedSubtitles.splice(result.destination.index, 0, movedItem);

    setAllSubtitles((prevSubtitles) => {
      return prevSubtitles.map((sub) => {
        if (sub.titleId === titleId) {
          return reorderedSubtitles.find((s) => s._id === sub._id) || sub;
        }
        return sub;
      });
    });

    // updateSubtitlesOrder(reorderedSubtitles);
  };

  return (
    <div className="container">
      <h1>Manage Titles</h1>

      {/* Title Input Modal */}
      <button type="button" className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#titleModal">
        Add Title
      </button>

      <div className="modal fade" id="titleModal" tabIndex="-1" aria-labelledby="titleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="titleModalLabel">
                {isEditingTitle ? 'Edit Title' : 'Add Title'}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control my-3"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveTitle} // Ensure correct action is called
                data-bs-dismiss="modal"
              >
                {isEditingTitle ? 'Save Title Changes' : 'Add Title'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Titles Section */}
      <DragDropContext onDragEnd={handleTitleDragEnd}>
        <Droppable droppableId="titles" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="row my-4">
              {allTitles.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="col-12 col-md-3 mb-3"
                    >
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <span>{item.title}</span>
                          <div>
                            <button
                              onClick={() => {
                                setCurrentTitleId(item._id);
                                setTitle(item.title);
                                setIsEditingTitle(true);
                              }}
                              className="btn btn-warning btn-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTitle(item._id)}
                              className="btn btn-danger btn-sm ms-2"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Subtitles Section */}
                        <DragDropContext onDragEnd={handleSubtitleDragEnd}>
                          <Droppable droppableId={`subtitles-${item._id}`}>
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.droppableProps} className="card-body">
                                {allSubtitles
                                  .filter(sub => sub.titleId === item._id)
                                  .map((sub, index) => (
                                    <Draggable key={sub._id} draggableId={sub._id} index={index}>
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className="d-flex justify-content-between align-items-center mb-2"
                                        >
                                          {isEditingSubtitle && currentSubtitleId === sub._id ? (
                                            <div className="w-100">
                                              <input
                                                type="text"
                                                className="form-control"
                                                value={subtitle}
                                                onChange={(e) => setSubtitle(e.target.value)}
                                              />
                                              <button
                                                className="btn btn-primary btn-sm mt-2"
                                                onClick={handleEditSubtitle}
                                              >
                                                Save
                                              </button>
                                              <button
                                                className="btn btn-secondary btn-sm mt-2 ms-2"
                                                onClick={() => setIsEditingSubtitle(false)}
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          ) : (
                                            <>
                                              <span>{sub.subtitle}</span>
                                              <div>
                                                <button
                                                  onClick={() => {
                                                    setCurrentSubtitleId(sub._id);
                                                    setSubtitle(sub.subtitle);
                                                    setIsEditingSubtitle(true);
                                                  }}
                                                  className="btn btn-warning btn-sm me-2"
                                                >
                                                  Edit
                                                </button>
                                                <button
                                                  onClick={() => handleDeleteSubtitle(sub._id)}
                                                  className="btn btn-danger btn-sm"
                                                >
                                                  Delete
                                                </button>
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>

                        {/* Show input for new subtitle */}
                        {showSubtitleInput === item._id && (
                          <div className="card-footer">
                            <input
                              type="text"
                              className="form-control"
                              value={subtitle}
                              onChange={(e) => setSubtitle(e.target.value)}
                            />
                            <button
                              className="btn btn-primary btn-sm mt-2"
                              onClick={() => handleSaveSubtitle(item._id)}
                            >
                              Add Subtitle
                            </button>
                            <button
                              className="btn btn-secondary btn-sm mt-2"
                              onClick={() => setShowSubtitleInput(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        )}

                        {/* Button to show subtitle input */}
                        {showSubtitleInput !== item._id && (
                          <div className="card-footer">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => setShowSubtitleInput(item._id)}
                            >
                              Add Subtitle
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoHeader;
