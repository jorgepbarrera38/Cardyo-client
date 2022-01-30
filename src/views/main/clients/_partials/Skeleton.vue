<template>
    <tbody>
        <tr v-for="item in 8">
            <td class="text-center text-muted">
                <center>
                    <vue-skeleton-loader
                        type="rect"
                        :width="100"
                        :height="15"
                        animation="fade"
                    />
                </center>
            </td>
            <td>
                <div class="widget-content p-0">
                    <div class="widget-content-wrapper">
                        <div class="widget-content-left mr-3">
                            <div class="widget-content-left">
                                <vue-skeleton-loader
                                    type="circle"
                                    :width="40"
                                    :height="40"
                                    animation="fade"
                                />
                            </div>
                        </div>
                        <div class="widget-content-left flex2">
                            <div class="widget-heading mb-1">
                                <vue-skeleton-loader
                                    type="rect"
                                    :width="170"
                                    :height="15"
                                    animation="fade"
                                />
                            </div>
                            <div class="widget-subheading opacity-7">
                                <vue-skeleton-loader
                                    type="rect"
                                    :width="70"
                                    :height="15"
                                    animation="fade"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td class="text-center">
                <center>
                    <vue-skeleton-loader
                        type="rect"
                        :width="200"
                        :height="15"
                        animation="fade"
                    />
                </center>
            </td>
            <td class="text-center">
                <center>
                    <vue-skeleton-loader
                        type="rect"
                        :width="180"
                        :height="15"
                        animation="fade"
                    />
                </center>
            </td>
            <td class="text-center">
                <center>
                    <vue-skeleton-loader
                        type="rect"
                        :width="100"
                        :height="15"
                        animation="fade"
                    />
                </center>
            </td>
            <td class="text-center">
                <center style="margin-top:13.6px;margin-bottom:13.6px;">
                    <vue-skeleton-loader
                        type="rect"
                        :width="120"
                        :height="15"
                        animation="fade"
                    />
                </center>
            </td>
        </tr>
    </tbody>
</template>