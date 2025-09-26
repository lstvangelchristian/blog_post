export class PublicFeedView {
    constructor() {
        this.authorSession = JSON.parse(localStorage.getItem('author-session'));

        this.$createBlogField = $(".js-create-blog-field");
        this.$createBlogForm = $(".js-create-blog-form");
        this.$actionResult = $(".js-action-result");

        this.$publicFeed = $(".js-public-feed");

        this.$modifyBlogFormContent = $(".js-modify-blog-form-content");
        this.$modifyBlogForm = $(".js-modify-blog-form");

        this.$reactionButtonContainer = $(".js-reaction-button-container");
    }

    async renderAuthorInformation () {
        $('.js-author-name').text(this.authorSession.username)
        $('.js-author-initial').text(this.authorSession.username.charAt(0));
    }

    async changeUi() {
        this.$createBlogField.on("focus", function () {
            $(this).attr("rows", 5);
        });

        this.$createBlogField.on("blur", function () {
            if ($(this).val()) {
                return;
            }

            $(this).attr("rows", 1);
        });
    }

    async createBlog(callback) {
        this.$createBlogForm.on("submit", (e) => {
            e.preventDefault();

            const createBlogForm = new FormData(this.$createBlogForm[0]);

            if (createBlogForm.get("blog-content") !== "") {
                this.$createBlogForm
                    .find('button[type="submit"]')
                    .prop("disabled", true);
            }

            const newBlog = {
                content: createBlogForm.get("blog-content"),
            };

            callback(newBlog).finally(() => {
                this.$createBlogForm
                    .find('button[type="submit"]')
                    .prop("disabled", false);
            });

            this.$createBlogField.attr("rows", 1);

            this.$createBlogField.attr("rows", 1).val("");
            this.$createBlogForm[0].reset();
        });
    }

    formatDate(action, date) {
        return `${action} on: ${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(
            2,
            "0"
        )} at ${String(date.getHours()).padStart(2, "0")}:${String(
            date.getMinutes()
        ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    }

    createReactionButton(reaction, blogId) {
        const reactionButton = $("<span>", {
            class: `reaction-button`,
            "data-reaction-type": reaction.type,
            "data-blog-id": blogId,
            css: { padding: "10px", cursor: "pointer", display: "inline-block" },
        })
        
        const img = $("<img>", {
            src: reaction.src,
            css: { width: "40px", transition: "transform 0.2s ease" },
        })

        img.hover(
            function() {
                $(this).css("transform", "scale(1.2)");
            },
            function() {
                $(this).css("transform", "scale(1)");
            }
        )

        reactionButton.append(img);
            
        return reactionButton;
    }

    createCommentButton(message, blogId) {
        const commentButton = $("<span>", {
            class: `message-button`,
            "data-blog-id": blogId,
            css: { padding: "10px", cursor: "pointer" },
        }).append(
            $("<img>", {
                src: message,
                css: { width: "40px" },
            })
        );

        return commentButton;
    }

    async renderPublicFeed(blogs) {
        this.$publicFeed.empty();

        if (blogs.length === 0) {
            this.$publicFeed.html('<h5 class="text-center mt-5">Be the first one to create a blog</h5>');
            return;
        }

        let blogsHTML = "";

        $.each(blogs, (_, b) => {
            const currentUserReaction = b.reactions.find(
                (r) => r.user_id === this.authorSession.id
            );

            blogsHTML += `
        <div class="mt-3 p-3 shadow-sm rounded" style="border: 1px solid lightgray !important;">

          ${
              b.author_id === this.authorSession.id
                  ? `
              <div class="text-end mb-3">
                <button class="btn btn-warning rounded js-blog-modal" data-action="update" data-id="${b.blog_id}">
                  <i class="bi bi-pencil-square"></i>
                </button>

                <button class="btn btn-danger rounded js-blog-modal" data-action="delete" data-id="${b.blog_id}">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            `
                  : ""
          }

          <!-- Feed Header -->
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
              <div class="bg-light d-flex align-items-center justify-content-center" 
                  style="width: 50px; height: 50px; border-radius: 50%;">
                <h5 class="m-0">${b.author.charAt(0).toUpperCase()}</h5>
              </div>
              
              <div class="ms-2">
                <h5 class="m-0">${b.author}</h5>
                <span>Author</span>
              </div>
            </div>

            <div class="w-100 text-end">
              <span>${this.formatDate("Posted", new Date(b.created_at))}</span>
            </div>
          </div>

          <!-- Feed Content -->
          <div class="shadow-sm p-3 mt-3 bg-light rounded">
            <span>${b.content}</span>
          </div>

          <!-- Post Summary -->
          <div class="d-flex mt-3">
            <div class="w-100 js-view-reactions" style="cursor: pointer;" data-reaction-blog-id="${
                b.blog_id
            }">
              <img src="${
                  currentUserReaction
                      ? `${
                            window.reactions[currentUserReaction.type_id - 1]
                                .src
                        }`
                      : ""
              }" style="width: 20px;" class="me-1" onerror="this.style.display='none';">
              <span>Reactions: ${b.reactions.length}</span>
            </div>
            <span class="w-100 text-end">Comments: ${b.comments.length}</span>
          </div>

          <!-- Submit Reaction and View Comment -->
          <div class="mt-3 pb-3">
            <div class="d-flex">
              <div class="w-100 text-center js-reaction-button-container" data-blog-id="${
                  b.blog_id
              }"></div>

              <div class="w-100 text-center js-message-button-container" data-blog-id="${
                  b.blog_id
              }">
              </div>
            </div>
          </div>
        </div>
      `;
        });

        this.$publicFeed.html(blogsHTML);

        this.$publicFeed
            .find(".js-reaction-button-container")
            .each((index, container) => {
                const $container = $(container);
                const blogId = $container.data("blog-id");

                window.reactions.forEach((reaction) => {
                    $container.append(
                        this.createReactionButton(reaction, blogId)
                    );
                });
            });

        this.$publicFeed
            .find(".js-message-button-container")
            .each((_, container) => {
                const $container = $(container);
                const blogId = $container.data("blog-id");

                $container.append(
                    this.createCommentButton(window.message, blogId)
                );
            });
    }

    async showModal(action, blogToBeModified) {
        const modifyBlogModal = $("#modifyBlogModal");

        $(".modal-title").text(`${action} Blog`);

        if (action === "update") {
            this.$modifyBlogFormContent.html(`
        <input type="hidden" name="action" value="update">
        <input type="hidden" name="blog-id" value="${blogToBeModified.id}">

        <textarea placeholder="What's on your mind?" name="updated-blog-content" style="resize: none;" class="form-control w-100 js-create-blog-field" rows="5">${blogToBeModified.content}</textarea>
      `);
        } else {
            this.$modifyBlogFormContent.html(`
        <input type="hidden" name="action" value="delete">
        <input type="hidden" name="blog-id" value="${blogToBeModified.id}">

        <p class="text-danger">Are you sure you want to delete this blog? This action cannot be undone.</p>
      `);
        }

        const modal = new bootstrap.Modal(modifyBlogModal);
        modal.show();
    }

    async modifyBlogFormOnSubmit(callback) {
        this.$modifyBlogForm.on("submit", (e) => {
            e.preventDefault();

            this.$modifyBlogForm
                .find('button[type="submit"]')
                .prop("disabled", true);

            const modifyBlogForm = new FormData(this.$modifyBlogForm[0]);

            const action = modifyBlogForm.get("action");
            const id = modifyBlogForm.get("blog-id");

            let modifyData = null;

            if (action === "update") {
                modifyData = {
                    content: modifyBlogForm.get("updated-blog-content"),
                };
            }

            callback(action, id, modifyData).finally(() => {
                this.$modifyBlogForm
                    .find('button[type="submit"]')
                    .prop("disabled", false);
            });
        });
    }

    async hideModal() {
        const modifyBlogModal = $("#modifyBlogModal");
        const modalInstance = bootstrap.Modal.getInstance(modifyBlogModal);

        if (modalInstance) {
            modalInstance.hide();
        } else {
            console.log(false);
        }
    }

    async showResult(action = "create", result) {
        const message = result.success
            ? `Your blog has been ${action}d successfully`
            : `${result.error}`;
        const color = result.success ? "success" : "danger";

        this.$actionResult.html(`
      <div class="alert alert-${color} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `);

        setTimeout(() => {
            $(".alert").removeClass("show");
        }, 3000);
    }

    // Reaction View Methods
    async showReactionModal(reactions) {
        const modifyBlogModal = $("#reactionsModal");
        $(".js-reaction-modal-title").text("Reactions");

        let reactionsHTML = "";

        $.each(reactions, (_, reaction) => {
            reactionsHTML += `
        <div class="mb-3 shadow-sm p-3 rounded" style="border: 1px solid lightgray">
          <div class="d-flex align-items-center">
            <img src="${
                window.reactions[reaction.type_id - 1].src
            }" alt="" style="width: 25px">
            <h5 class="ms-3 m-0">${reaction.reacted_by}</h5>
          </div>
          
          <div class="text-end">
            <span>${this.formatDate(
                "Reacted",
                new Date(reaction.created_at)
            )}</span>
          </div>
        </div>
      `;
        });

        $(".js-reaction-modal-content").html(reactionsHTML);

        const modal = new bootstrap.Modal(modifyBlogModal);
        modal.show();
    }

    async showCommentModal(comments, blogId) {
        // $(".js-comment-modal-content").empty();
        $(".js-comment-modal-title").text("Comments");

        $(".js-comment-form-content").html(`
            <input type="hidden" name="blog-id" value="${blogId}">
            <textarea class="form-control me-1 rounded" name="comment" rows="1" style="resize: none; border: 1px solid lightgray"></textarea>
            <button class="btn btn-primary btn-sm rounded">Comment</button>
        `);

        this.renderComments(comments)

        const commentsModal = $("#commentsModal");
        const modal = bootstrap.Modal.getInstance(commentsModal[0]) || new bootstrap.Modal(commentsModal[0]);
        modal.show();
    }

    async renderComments(comments) {
        if (comments.length === 0) {
            $(".js-comment-modal-content").html(`
        <div class="text-center">Be the first one to comment</div>
      `);
        } else {
            let commentsHTML = '';
            $.each(comments, (_, comment) => {
              commentsHTML += `
                <div class="shadow-sm p-3 rounded mt-3" style="border: 1px solid lightgray">

                    <div class="js-cancel-edit-comment-${comment.comment_id} text-end"></div>

                    ${comment.comment_by_id === this.authorSession.id 
                        ? `<div class="modify-comment-container-${comment.comment_id} text-end">
                            <button class="btn btn-warning rounded js-modify-comment-button" data-action="update" data-comment-id="${comment.comment_id}" data-comment-content="${comment.content}">
                                <i class="bi bi-pencil-square"></i>
                            </button>

                            <button class="btn btn-danger rounded js-modify-comment-button" data-action="delete" data-comment-id="${comment.comment_id}" data-comment-content="${comment.content}">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>`
                        : ''
                    }

                    <h5>${comment.commented_by}</h5>

                    <div class="p-3 shadow-sm rounded js-edit-comment-${comment.comment_id}" style="border: 1px solid lightgray">${comment.content}</div>
                  
                    <div class="text-end mt-3">
                        <span>${this.formatDate('Commented', new Date(comment.created_at))}</span>
                    </div>
                </div>
              `
            })
          
            $(".js-comment-modal-content").html(commentsHTML);
        }
    }

    async createComment(callback) {
        $(".js-comment-form").on("submit", (e) => {
            e.preventDefault();

            const commentForm = new FormData(e.currentTarget);

            const newComment = {
                content: commentForm.get("comment"),
                blog_id: commentForm.get("blog-id"),
                user_id: this.authorSession.id
            };

            callback(newComment)
        });
    }

    async makeCommentEditable (comment) {
        const commentToBeUpdated = $(`.js-edit-comment-${comment.id}`);

        commentToBeUpdated.empty();

        commentToBeUpdated.html(`
            <form class="js-update-comment-form">
                <input type="hidden" name="comment-id" value="${comment.id}">
                <textarea class="form-control auto-resize" name="comment" rows="3">${comment.content}</textarea>
                <div class="text-end mt-3">
                    <button type="submit" class="btn btn-primary btn-sm rounded">Update</button>
                </div>
            </form>
        `)

        const updateCommentButtonActions = $(`.modify-comment-container-${comment.id}`);

        updateCommentButtonActions.empty();

        $(`.js-cancel-edit-comment-${comment.id}`).html(
            `<button class="btn btn-danger rounded js-cancel-edit-button-${comment.id}">
                <i class="bi bi-x-lg"></i>
            </button>`
        )



        $(`.js-cancel-edit-button-${comment.id}`).on('click', () => {
            updateCommentButtonActions.html(
                `
                    <button class="btn btn-warning rounded js-modify-comment-button" data-action="update" data-comment-id="${comment.id}" data-comment-content="${comment.content}">
                        <i class="bi bi-pencil-square"></i>
                    </button>

                    <button class="btn btn-danger rounded js-modify-comment-button" data-action="delete" data-comment-id="${comment.id}" data-comment-content="${comment.content}">
                        <i class="bi bi-trash"></i>
                    </button>
                `
            )

            commentToBeUpdated.empty();

            commentToBeUpdated.text(`${comment.content}`);

            $(`.js-cancel-edit-comment-${comment.id}`).empty();
        })
    }

    async showDeleteConfirmation (id) {
        $(".js-delete-comment-title").text("Delete Comment");

        $(".js-delete-comment-form-content").html(`
            <input type="hidden" name="comment-id" value="${id}">
            <span class="text-center text-danger">Are you sure you really want to delete this comment? This cannot be undone.</span>
        `);

        const commentsModal = $("#deleteCommentModal");
        const modal = bootstrap.Modal.getInstance(commentsModal[0]) || new bootstrap.Modal(commentsModal[0]);
        modal.show();
    }

    async logout (callback) {
        $('.js-logout').on('click', () => {
            callback(true)
        })
    }
}
