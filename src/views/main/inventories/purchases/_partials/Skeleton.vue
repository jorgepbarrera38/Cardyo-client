<template>
    <tbody>
        <tr v-for="item in 8">
            <td class="text-center text-muted">
            </td>
            <td class="text">
                    <vue-skeleton-loader
                        type="rect"
                        :width="150"
                        :height="15"
                        animation="fade"
                    />
            </td>
            <td class="text">
                    <vue-skeleton-loader
                        type="rect"
                        :width="70"
                        :height="15"
                        animation="fade"
                    />
            </td>
            <td class="text">
                    <vue-skeleton-loader
                        type="rect"
                        :width="70"
                        :height="15"
                        animation="fade"
                    />
            </td>
            <td class="text">
                    <vue-skeleton-loader
                        type="rect"
                        :width="200"
                        :height="15"
                        animation="fade"
                    />
            </td>
            <td class="text">
                    <vue-skeleton-loader
                        type="rect"
                        :width="80"
                        :height="15"
                        animation="fade"
                    />
            </td>
            <td class="text">
                    <vue-skeleton-loader
                        type="rect"
                        :width="30"
                        :height="15"
                        animation="fade"
                    />
            </td>
        </tr>
    </tbody>
</template>