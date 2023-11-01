import { courseState } from "../atoms/course";
import { selector } from "recoil";

export const isCourseloading= selector({
    key:"isCourseloadingState",
    get:({get})=>{
        const state = get(courseState)
        return state.isLoading
    },
   
})

export const courseDetails = selector({
    key :"courseDetailsState",
    get:({get})=>{
        const state = get(courseState)
        return state.course
    }

})
export const courseTitle = selector({
    key :"courseTitleState",
    get:({get})=>{
        const state = get(courseState)
        return state.course.title
    }

})
export const courseDescription = selector({
    key :"courseDescriptionState",
    get:({get})=>{
        const state = get(courseState)
        return state.course.description
    }

})

export const coursePrice = selector({
    key :"coursePriceState",
    get:({get})=>{
        const state = get(courseState)
        return state.course.price
    }

})
export const courseImage = selector({
    key :"courseImageState",
    get:({get})=>{
        const state = get(courseState)
        return state.course.image
    }

})