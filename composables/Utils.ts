import { useStore } from "~/store/app"

export function useUtils() {
  const debounce = function debounce<T extends unknown[], U>(callback: (...args: T) => PromiseLike<U> | U, wait: number) {
    let timer: number

    return (...args: T): Promise<U> => {
      clearTimeout(timer)
      return new Promise(resolve => {
        timer = window.setTimeout(() => resolve(callback(...args)), wait)
      })
    }
  }

  const getDomain = () => {
    return useStore()
  }

  const slugify = (...args: (string | number)[]): string => {
    const value = args.join(" ")

    return value
      .normalize("NFD") // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/\s+/g, "-") // separator
  }

  const encodeBase64 = (value: string): string => {
    if (process.client) {
      return window.btoa(unescape(encodeURIComponent(value)))
    } else {
      return Buffer.from(value, "ascii").toString("base64")
    }
  }

  const decodeBase64 = (value: string): string => {
    if (process.client) {
      return decodeURIComponent(escape(window.atob(value)))
    } else {
      return Buffer.from(value, "base64").toString("ascii")
    }
  }

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  const getFilterToSlug = (value: string): string => {
    if (value === "todos") {
      return "todos"
    } else if (value === "is_covid") {
      return "covid"
    } else if (value === "is_eco") {
      return "eco"
    } else if (value === "is_outlet") {
      return "outlet"
    } else {
      return "todos"
    }
  }

  const getSlugToFilter = (value: string): string => {
    if (value === "todos") {
      return "all"
    } else if (value === "covid") {
      return "is_covid"
    } else if (value === "eco") {
      return "is_eco"
    } else if (value === "outlet") {
      return "is_outlet"
    } else {
      return "all"
    }
  }

  const getOrderToSlug = (value: string): string => {
    if (value === "most_consumed") {
      return "mas_consumidos"
    } else if (value === "less_consumed") {
      return "menos_consumidos"
    } else if (value === "elastic_relevance") {
      return "relevancia"
    } else if (value === "alphabetically") {
      return "alfabeticamente"
    } else if (value === "by_family") {
      return "por_familia"
    } else {
      return "mas_consumidos"
    }
  }

  const getSlugToOrder = (value: string): string => {
    if (value === "mas_consumidos") {
      return "most_consumed"
    } else if (value === "menos_consumidos") {
      return "less_consumed"
    } else if (value === "relevancia") {
      return "elastic_relevance"
    } else if (value === "alfabeticamente") {
      return "alphabetically"
    } else if (value === "por_familia") {
      return "by_family"
    } else {
      return "most_consumed"
    }
  }

  return {
    debounce,
    slugify,
    encodeBase64,
    decodeBase64,
    validateEmail,
    getFilterToSlug,
    getSlugToFilter,
    getOrderToSlug,
    getSlugToOrder,
    getDomain
  }
}
