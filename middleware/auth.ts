import type { Middleware } from "@nuxt/types"

const handler: Middleware = async ({ redirect }) => {
  if (!process.server) {
    if (window && !window.localStorage.getItem("token")) {
      return redirect(`/auth/login`)
    }
  }
}

export default handler
