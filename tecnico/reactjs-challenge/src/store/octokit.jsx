import { Octokit } from "@octokit/core";

const oc = new Octokit();

const octokit = (state = oc, action) => {
    switch (action.type) {
        default:
            return state;
    }

}
export { octokit }