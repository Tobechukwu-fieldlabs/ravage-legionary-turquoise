<!-- Project Comments Go Here -->

## Bug I encountered

I fixed a bug with the command scripts. When the development server starts for the first time, the network request for fetching all applications fails. The network request fails because both "FE-start" and "BE-start" run concurrently, and the server isn't available at the time of starting.

The fix for this involved making use of a "wait-on" package. The "wait-on" helps delay the frontend's start until the local API is up and running.