# Teen-Finance Contribution Guidelines

## Adding new code
1. On your local machine, make sure you have the most up-to-date version of the `dev` branch:
```
git pull origin dev
```

2. Fix all merge conflicts on `dev` if there are any.
3. Checkout to a new branch from `dev` using the [Branch Naming Convention](#branch-naming-convention).
4. During the actual work, it's considered a good practice to commit changes in small bites, instead of committing everything you've changed in a single commit.
5. Also, try to plan ahead before you start coding. If the task is too big, you can create a "main" branch for it and then from that branch checkout to a different branch for each sub-task.
   If that's the case, it will be better to create a separate PR for each sub-task. This way it will be easier to develop and also easier to review the changes.
6. Once you are done developing create a PR from the feature branch to dev (or from the sub-task branch to the feature branch) according to the [Creating a PR](#creating-a-pr) section.

## Creating a PR
1. Make sure the source and destination branches are correct (usually it will be from your feature branch to `dev`).
2. Add a concise title and a short description.
3. If the PR is related to an issue (for example: a bug fix) add a reference to the issue in the PR description. For example: `Fixes #{ISSUE_NUMBER}`. Once you type the `#` character Github will open a selection
   menu with the available issues.
5. Set a reviewer for the PR.
6. Once the review is done and there are no unresolved comments both the PR and the issue should be closed. We are not using any automatic merges so it's the PR owner's responsibility to close the PR if it's done.

## Branch Naming Convention
Every branch should have the following structure: `{CHANGE_TYPE}/{UNIQUE_NAME}`, where:
- `CHANGE_TYPE` can have one of the following values:
  * `feature` when adding/updating a new feature. This can be as little as updating a component, or as large as adding a whole new screen.
  For example: `feature/add-new-splash-screen`, `feature/add-form-validation`, etc.
  * `bugfix` when fixing a bug in an existing feature. A bug can be "logical", but also design-related.
  For example: `bugfix/align-colors-with-design`, `bugfix/button-state-not-reset`, etc.
  * `hotfix` when a crucial bug is found in `production` and we need to fix it "on the spot" without using the regular merge flow, but on the `master` or `dev` branch directly.
   This will hopefully be a rare situation and it will be discussed before-hand.
- `UNIQUE_NAME` depands on the specific change. Make sure the name is accurate and not too long, so it will be clear to the other devs. The name should start with a verb describing what you
change (add/remove/update, etc.).
For example: `feature/add-new-welcome-screen`, `feature/remove-unused-component`, etc.

## Creating an Issue
1. Make sure the title is concise, accurate and describes what the issue is about.
2. In the description section (here it's called a `comment`) make sure you are not missing any detail, especially if the issue is a bug.
3. In case the issue is a bug - add a short paragraph describing how to reproduce it. Try to be as verbose as you can and assume that the assigned dev knows nothing about it.
4. Assign the repo owner.
5. Add relevant labels (`bug` for a bug, `task` for a new feature or an update). Usually a single label will be enough.
